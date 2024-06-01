import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const UserDonutChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = response.data;

        setChartData({
          labels: ['Active Users', 'Inactive Users'],
          datasets: [
            {
              data: [data.activeUsers, data.inactiveUsers],
              backgroundColor: ['#36A2EB', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FF6384']
            }
          ]
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques des utilisateurs', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Statistiques des utilisateurs</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default UserDonutChart;

