import Chart from 'chart.js/auto';
import data from '../data.json';

const DMSansFont = new FontFace('DM Sans', 'url(https://fonts.googleapis.com/css2?family=Alata&family=DM+Sans:wght@700&display=swap)');
document.fonts.add(DMSansFont);
DMSansFont.load();

// find max element
function argMax(array) {
  return array.map((x, i) => [x.amount, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

// assign color for each bar
let color = data.map(x => getComputedStyle(document.documentElement).getPropertyValue('--color-primary'));

// assign new color value to max element
color[argMax(data)] = getComputedStyle(document.documentElement).getPropertyValue('--color-bar-primary');

new Chart(
  document.getElementById('graph'),
  {
    type: 'bar',
    options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false
          },
          ticks: {
            color: getComputedStyle(document.documentElement).getPropertyValue('--color-font-secondary'),
            font: DMSansFont
          }
        },
        y: {
          display: false
        }
      },
      animation: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          bodyFont: DMSansFont,
          cornerRadius: 4,
          backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-font-primary'),
          caretSize: 0,
          xAlign: 'center',
          yAlign: 'bottom',
          displayColors: false,
          callbacks: {
            title: () => null,
            label: function(context) {
              let label = context.dataset.label || '';

              if (label) {
                label += '$';
              }

              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }

              return label;
            },
          }
        }
      }
    },
    data: {
      labels: data.map(row => row.day),
      datasets: [
        {
          data: data.map(row => row.amount),
          borderRadius: 3,
          backgroundColor: color,
          borderSkipped: false,
        }
      ]
    }
  }
);