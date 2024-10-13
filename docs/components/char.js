const filter = ['безопасность', 'россия', 'всу'];

const labels = [];
const dataList = filter.map(() => []);

window.addEventListener(EVENT.KEYWORDS_DAY_LOADED, function({ detail: { day, list } }) {
    labels.push(day);

    filter.forEach((word, index) => {
        const count = list.data.keywords.find(({ keyword }) => keyword === word) || 0;
        console.log(day, count)
        dataList[index].push({ day, count });
    });
});
window.addEventListener(EVENT.KEYWORDS_LOADED, () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line', // Тип графика
        data: {
            labels: labels, // Метки по оси X
            datasets: dataList.map((data, index) => {
                return {
                    label: filter[index],
                    data,
                    fill: false,
                    borderColor: `hsl(${index * 60}, 100%, 50%)`,
                    tension: 0.1
                }
            }),
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true // Начинать ось Y с нуля
                }
            }
        }
    });
});
