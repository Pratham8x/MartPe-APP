import { FC } from "react";
import { LinearGradient } from "expo-linear-gradient";
import FashionCard from "./FashionCard";
import { View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

interface CatalogItem {
  bpp_id: string;
  bpp_uri: string;
  catalog_id: string;
  category_id: string;
  descriptor: {
    images: string[];
    long_desc: string;
    name: string;
    short_desc: string;
    symbol: string;
  };
  id: string;
  location_id: string;
  non_veg: boolean | null;
  price: {
    maximum_value: number;
    offer_percent: number | null;
    offer_value: number | null;
    value: number;
  };
  provider_id: string;
  quantity: {
    available: number | null;
    maximum: number | null;
  };
  veg: boolean | null;
}

interface PLPCardContainerProps {
  catalog: CatalogItem[];
  domainColor: string;
}

const PLPCardContainer: FC<PLPCardContainerProps> = ({
  catalog,
  domainColor,
}) => {
  const bgColor = domainColor.slice(0, -3);
  const gradientColors = [
    bgColor + "1)",
    bgColor + "0.7486)",
    bgColor + "0.1)",
  ];

  return (
    <LinearGradient
      colors={[gradientColors[0], gradientColors[1], gradientColors[2]]}
      start={[0, 0]}
      end={[0, 0.1]}
      style={{
        borderRadius: 25,
        padding: 10,
        paddingTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {catalog.map((item) => {
        const name = item?.descriptor?.name;
        const desc = item?.descriptor?.long_desc;
        const value = item?.price?.value;
        const maxPrice = 650; // TODO: Assuming a default value, replace with actual logic
        const discount = (((maxPrice - value) / maxPrice) * 100).toFixed(0);
        const image = item?.descriptor?.symbol || item?.descriptor?.images[1];

        return (
          <FashionCard
            key={item?.id}
            itemName={name}
            desc={desc}
            value={value}
            maxPrice={maxPrice}
            discount={discount}
            image={image}
            id={item.id}
          />
        );
      })}
    </LinearGradient>
  );
};

export default PLPCardContainer;
