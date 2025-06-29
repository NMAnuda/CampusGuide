import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { Chart, registerables } from 'chart.js';
import './course.css';

Chart.register(...registerables);

function CourseSearch() {
  const [data, setData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('');
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const chartRef = useRef(null);
  const mainChart = useRef(null);
  const yearChart = useRef(null);

  const fetchAllData = async () => {
    console.log('Fetching all data');
    setLoading(true);
    setMessage('');
    try {
      const response = await Axios.get('http://localhost:3002/details');
      const users = response.data.users || [];
      setData(users);

      const uniqueCourses = [...new Set(users.map((user) => user.course))].sort();
      const uniqueYears = [...new Set(users.map((user) => user.year))].sort();
      const uniqueCampuses = [...new Set(users.map((user) => user.campus))].sort();

      setCourses(uniqueCourses);
      setYears(uniqueYears);
      setCampuses(uniqueCampuses);
      setLoading(false);

      if (mainChart.current) mainChart.current.destroy();
      if (yearChart.current) yearChart.current.destroy();
    } catch (error) {
      setLoading(false);
      setMessage('Error fetching data. Please try again.');
      console.error('Error fetching all data:', error);
    }
  };

  const fetchCourseYearData = async (course, year, campus) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await Axios.post('http://localhost:3002/course', { course, year, campus });
      const users = response.data.users || [];
      console.log('Filtered data:', users);
      setData(users);
      setLoading(false);

      if (users.length === 0) {
        setMessage('No records found for this filter.');
        if (mainChart.current) mainChart.current.destroy();
        if (yearChart.current) yearChart.current.destroy();
      } else {
        requestAnimationFrame(() => updateChart(users, course, year, campus));
        if (year === '' && course) updateYearChart(course, campus);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error searching data. Please try again.');
      console.error('Error searching course, year, campus:', error);
      if (mainChart.current) mainChart.current.destroy();
      if (yearChart.current) yearChart.current.destroy();
    }
  };

  const updateChart = (users, course, year, campus) => {
    try {
      if (mainChart.current) mainChart.current.destroy();

      const ctx = chartRef.current?.getContext('2d');
      if (!ctx) return;

      const districtData = {};
      users.forEach((user) => {
        const count = Number.isFinite(user.Students) ? user.Students : 0;
        const key = `${user.campus || 'N/A'} - ${user.district || 'Unknown'}`;
        districtData[key] = (districtData[key] || 0) + count;
      });

      const labels = Object.keys(districtData);
      const studentCounts = Object.values(districtData);

      mainChart.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Number of Students',
            data: studentCounts,
            backgroundColor: 'rgba(37, 99, 235, 0.6)',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Students' }
            },
            x: {
              title: { display: true, text: 'Campus - District' }
            }
          },
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: `Students in ${course} (${year || 'All Years'})${campus ? ` at ${campus}` : ''}`,
              font: { size: 16 }
            }
          }
        }
      });
    } catch (error) {
      console.error('Chart rendering error:', error);
    }
  };

  const updateYearChart = async (course, campus) => {
    try {
      const response = await Axios.get('http://localhost:3002/details');
      const allUsers = response.data.users || [];
      const filtered = allUsers.filter((user) =>
        user.course === course && (campus === '' || user.campus === campus)
      );

      const yearData = {};
      filtered.forEach((user) => {
        const year = user.year;
        const count = Number.isFinite(user.Students) ? user.Students : 0;
        if (year) {
          yearData[year] = (yearData[year] || 0) + count;
        }
      });

      const labels = Object.keys(yearData).sort();
      const counts = labels.map((year) => yearData[year]);

      if (yearChart.current) yearChart.current.destroy();

      const ctx = document.getElementById('yearChart')?.getContext('2d');
      if (!ctx) return;

      yearChart.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `Yearly Students in ${course} ${campus ? `(${campus})` : ''}`,
            data: counts,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: 'Students' },
              ticks: { maxTicksLimit: 5 }
            },
            x: {
              title: { display: true, text: 'Year' }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Students in ${course} Over the Years`,
              font: { size: 16 }
            },
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    } catch (error) {
      console.error('Error generating year-wise chart:', error);
    }
  };

  const handleCourseChange = (e) => {
    const course = e.target.value;
    setSelectedCourse(course);
    if (course === '' && selectedYear === '' && selectedCampus === '') {
      fetchAllData();
    } else {
      fetchCourseYearData(course, selectedYear, selectedCampus);
      if (selectedYear === '' && course) updateYearChart(course, selectedCampus);
      else if (yearChart.current) yearChart.current.destroy();
    }
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    if (selectedCourse === '' && year === '' && selectedCampus === '') {
      fetchAllData();
    } else {
      fetchCourseYearData(selectedCourse, year, selectedCampus);
      if (selectedCourse && year === '') updateYearChart(selectedCourse, selectedCampus);
      else if (yearChart.current) yearChart.current.destroy();
    }
  };

  const handleCampusChange = (e) => {
    const campus = e.target.value;
    setSelectedCampus(campus);
    if (selectedCourse === '' && selectedYear === '' && campus === '') {
      fetchAllData();
    } else {
      fetchCourseYearData(selectedCourse, selectedYear, campus);
      if (selectedCourse && selectedYear === '') updateYearChart(selectedCourse, campus);
      else if (yearChart.current) yearChart.current.destroy();
    }
  };

  useEffect(() => {
    fetchAllData();
    return () => {
      if (mainChart.current) mainChart.current.destroy();
      if (yearChart.current) yearChart.current.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="course-search-card">
          <h2 className="title">Course Search</h2>

          <div className="form-group">
            <label htmlFor="campus">Select Campus</label>
            <select
              id="campus"
              value={selectedCampus}
              onChange={handleCampusChange}
              disabled={loading}
              className="course-select"
            >
              <option value="">All Campuses</option>
              {campuses.map((campus, index) => (
                <option key={index} value={campus}>{campus}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="course">Type or Select Course</label>
            <input
              list="course-options"
              id="course"
              value={selectedCourse}
              onChange={handleCourseChange}
              disabled={loading}
              className="course-select"
              placeholder="Type or select course"
            />
            <datalist id="course-options">
              {courses.map((course, index) => (
                <option key={index} value={course} />
              ))}
            </datalist>
          </div>

          <div className="form-group">
            <label htmlFor="year">Select Year</label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              disabled={loading}
              className="course-select"
            >
              <option value="">All Years</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'info'}`}>
              {message}
            </div>
          )}

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>District</th>
                    <th>Stream & Subjects</th>
                    <th>Course</th>
                    <th>Campus</th>
                    <th>Z-Range</th>
                    <th>Students</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row) => (
                      <tr key={row._id}>
                        <td>{row.district}</td>
                        <td>
                          <div>{row.stream}</div>
                          <div>Subject 1: {row.subject1}</div>
                          <div>Subject 2: {row.subject2}</div>
                          <div>Subject 3: {row.subject3}</div>
                        </td>
                        <td>{row.course}</td>
                        <td>{row.campus}</td>
                        <td>{row.zValue1} - {row.zValue2}</td>
                        <td>{row.Students ?? 0}</td>
                        <td>{row.year}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {selectedCourse && !loading && data.length > 0 && (
            <>
              <div className="chart-container">
                <canvas ref={chartRef} style={{ width: '100%', maxHeight: '300px' }}></canvas>
              </div>
              {selectedYear === '' && (
                <div className="chart-container">
                  <canvas id="yearChart" style={{ width: '100%', maxHeight: '300px' }}></canvas>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseSearch;