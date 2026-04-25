import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,

} from "recharts";



const PriceChart = ({ history }) => {




    // =========================
    // FORMAT CHART DATA
    // =========================

    const data = history.map((item) => ({

        date: new Date(item.date)
            .toLocaleDateString(),

        price: item.price,

    }));




    return (

        <div className="mt-6">

            <ResponsiveContainer
                width="100%"
                height={250}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="price"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
};

export default PriceChart;