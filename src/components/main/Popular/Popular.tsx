import { useEffect, useState } from 'react'
import Card, { CardType } from '../Card'
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

export default function Popular() {

    const [popular,setPopular] = useState<CardType[]>([]);

    const fetch = async ()=>{
        
        const fetchQuery = query(
            collection(db,"shoes"),
            where("hit",">=",100),
            limit(20)
        );

        const snapshot = await getDocs(fetchQuery);

        const shoes = snapshot.docs.map((doc)=>{

            const {price,description,name,src} : CardType = doc.data();

            return {
                price,
                description,
                name,
                src,
                id : doc.id
            }

        });

        setPopular(shoes);

    }

    useEffect(()=>{
        fetch();
    },[]);

  return (
    <section className="mt-[100px]">
        <div className="max-w-[1600px] w-[95%] mx-auto flex items-start gap-10">

            <h2 className="mr-12 sticky top-[calc((30+75)*1px)] text-3xl font-bold leading-normal whitespace-nowrap">
                지금 가장<br/>
                주목해야 할 인기상품
            </h2>
            
            <div className="grid grid-cols-5 gap-5 flex-1">
                {
                    popular.length > 0 ? popular.map((el)=> <Card key={el.id} {...el} />) : null
                }
            </div>
        </div>
    </section>
  )
}