import React from "react";
import { ScrollView } from "react-native";
import PLPCard from "./PLPCard";

interface Descriptor {
  images: string[];
  name: string;
  symbol: string;
}

interface Price {
  maximum_value: number;
  offer_percent: number | null;
  offer_value: number | null;
  value: number;
}

interface Quantity {
  maximum: {
    count: number;
  };
  available: {
    count: number;
  };
}

interface CatalogItem {
  bpp_id: string;
  bpp_uri: string;
  catalog_id: string;
  category_id: string;
  descriptor: Descriptor;
  id: string;
  location_id: string;
  non_veg: boolean | null;
  price: Price;
  provider_id: string;
  veg: boolean;
  provider: {
    id: string;
  };
  quantity: Quantity;
}

interface DropdownProps {
  isVisible: boolean;
  data: CatalogItem[];
  providerId: string;
  searchString: string;
  handleOpenModal: () => void;
  foodDetails: (data: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  isVisible,
  data,
  providerId,
  handleOpenPress,
  searchString,
  foodDetails,
}) => {
  return (
    <ScrollView style={{ display: isVisible ? "flex" : "none" }}>
      {data
        .filter((item) => {
          if (searchString) {
            return item?.descriptor?.name
              .toLowerCase()
              .includes(searchString?.toLowerCase());
          } else {
            return item;
          }
        })
        .map((item, index) => (
          <PLPCard
            key={index}
            itemName={item?.descriptor?.name}
            itemImg={item.descriptor.images[0]}
            shortDesc={item.descriptor.short_desc}
            longDesc={item.descriptor.long_desc}
            offerPrice={item.price.value}
            originalPrice={item.price.maximum_value}
            rating={4.4}
            veg={item.non_veg || item.veg}
            id={item.id}
            providerId={providerId}
            maxLimit={Math.min(
              item.quantity.maximum.count,
              item.quantity.available.count
            )}
            handleOpenPress={handleOpenPress}
            foodDetails={foodDetails}
          />
        ))}
    </ScrollView>
  );
};

export default Dropdown;
