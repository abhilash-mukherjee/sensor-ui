import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Box } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { getLocationStatus } from '../../helper/helpers';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const TimeSeriesChart = ({ readings, locationStatus, interval, minY, maxY, yLabel, xLabel, chartLabel, readingLabel }) => {
    // Create labels based on the interval
    const labels = readings.map((_, index) => `${index * interval}`);

    // Last point value
    const lastPoint = readings[readings.length - 1];

    const data = {
        labels,
        datasets: [
            {
                label: readingLabel,
                data: readings,
                borderColor: !!locationStatus ? locationStatus.standardColor : 'red',
                backgroundColor: 'rgba(109, 199, 192, 0.5)',
                pointRadius: readings.map((_, index) => index === readings.length - 1 ? 8 : 3), // Bigger radius for the last point
                pointHoverRadius: readings.map((_, index) => index === readings.length - 1 ? 10 : 5),
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: minY,
                suggestedMax: maxY,
                title: {
                    display: true,
                    text: yLabel,
                }
            },
            x: {
                title: {
                    display: true,
                    text: xLabel,
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: false,
                text: chartLabel,
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function(tooltipItems) {
                        return 'Reading';
                    },
                    label: function(context) {
                        const label = context.dataset.label;
                        const value = context.parsed.y;
                        if (context.dataIndex === readings.length - 1) {
                            return `${label}: ${value} (latest)`;
                        }
                        return `${label}: ${value}`;
                    }
                }
            },
        },
    };

    return (
        <Box border="1px" borderColor="gray.200" p={4}>
            <Line data={data} options={options} />
        </Box>
    );
};

export default TimeSeriesChart;
