import { useState, FC } from "react";
import { View } from "react-native";
import FashionCategories from "./FashionCategories";
import PLPCardContainer from "./PLPCardContainer";

interface PLPFashionProps {
  headers: string[];
  catalog: any[];
}

const PLPFashion: FC<PLPFashionProps> = ({ headers, catalog }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  //
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <FashionCategories
        onFilterSelect={handleCategorySelect}
        headers={headers}
      />
      <PLPCardContainer
        domainColor="rgba(163, 251, 251, 1)"
        catalog={catalog}
      />
    </View>
  );
};

export default PLPFashion;
