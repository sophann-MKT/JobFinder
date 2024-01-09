import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import Title from '../../components/Title';
import styles from './styles';
import Categories from '../../components/Categories';
import AttractionCard from '../../components/AttractionCard';
import jsonData from '../../data/attractions.json';
import categories from '../../data/categories.json';

const ALL = 'All';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
  });

  useEffect(() => {
    if (selectedCategory === ALL) {
      setData(jsonData);
    } else {
      const filteredData = jsonData?.filter(item =>
        item?.categories.includes(selectedCategory),
      );
      setData(filteredData);
    }
  }, [selectedCategory]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        style={{flexGrow: 1}}
        ListEmptyComponent={<Text>No items found.</Text>}
        ListHeaderComponent={
          <>
            <Title text="Where do" style={{fontWeight: 'normal'}} />
            <Title text="you want to go?" />
            <Title text="Explore Attractions" style={styles.subtitle} />
            <Categories
              categories={[ALL, ...categories]}
              selectedCategory={selectedCategory}
              onCategoryPress={setSelectedCategory}
            />
          </>
        }
        keyExtractor={item => String(item?.id)}
        renderItem={({item, index}) => (
          <AttractionCard
            key={item.id}
            style={index % 2 === 0 ? {marginRight: 12} : {}}
            title={item.name}
            subtitle={item.city}
            imgSrc={item.images?.length ? item.images[0] : null}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
