import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51MocQcEsJN2nQEizqmCWp4NtPsJuMz69cbZlYmtT97mnV0PBPb3M4hDf97rBC2oWDG0dMBj6DYgKIgnSqO1cmQ9m00tNhbzVAW');

export default stripePromise;
