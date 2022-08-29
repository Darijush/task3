import { useState, useEffect } from "react";
function Books() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [types, setTypes] = useState([]);
    useEffect(() => {
        fetch("https://in3.dev/knygos/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        fetch("https://in3.dev/knygos/types/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTypes(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                {items.map(item => (
                    <div key={item.id}>
                        <figure className="picturePlace">
                            <img className="picture" src={item.img}
                                alt={item.title} />
                            <figcaption >{item.title}</figcaption>
                        </figure>
                        <h6>{"Author " + item.author}</h6>
                        {
                            types.map(type => type.id === item.id ? <h6>{type.title}</h6> : null)
                        }
                        <h6>{"Price:" + item.price}</h6>
                    </div>
                ))}
            </div>
        );
    }
}

export default Books;