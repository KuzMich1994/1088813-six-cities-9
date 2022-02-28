export type LocationOffer = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type HostOffer = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type OfferCity = {
  location: LocationOffer;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: OfferCity;
  description: string;
  goods: string[];
  host: HostOffer;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: LocationOffer;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}
