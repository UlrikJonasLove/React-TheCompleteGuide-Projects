import styles from './AvailableMeals.module.css';
import { Card } from '../UI/Card';
import { MealItem } from './MealItem/MealItem';
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

export const AvailableMeals = () => {
    const [meals, setMeals ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError ] = useState(null)

    // craete a constant which contains the data and maps it to a list of items
    // useEffect function cant be an async await 
    useEffect(() => {
      const fetchMeals = async () => {
        // get is default method in fetch
        const response = fetch("https://react-http-9fa33-default-rtdb.europe-west1.firebasedatabase.app/meals.json");
        
        if(!response.ok) {// if the response is not ok, meaning it is not 200 then throw a new error
          throw new Error('Something went wrong!')
        }

        // response data will be an object
        const responseData = await response.json();
        // convert responseData to an array
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
              id:key,
              name:responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price
        });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      };

        fetchMeals().catch(error =>{
            setIsLoading(false)
            setHttpError(error.message)
      });
    }, []) 

    if(isLoading){
      return <section className={styles.MealsIsLoading}>
        <p>Loading ...</p>
      </section>
    }
    if(httpError) {
      return <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    }
    const mealsList = meals.map(meal => 
    <MealItem key={meal.id}
    id={meal.id}
    title={meal.name} 
    description={meal.description} 
    price={meal.price}/>);

    return (
    <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
        
    </section>
    )
}