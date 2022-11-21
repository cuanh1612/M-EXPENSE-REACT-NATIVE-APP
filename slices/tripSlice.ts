import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { ITrip } from "../types/inputTypes";

export const createTrip = createAsyncThunk(
  "trip/createTrip",
  async ({ trip }: { trip: ITrip }) => {
    let newTrips: ITrip[] = [];

    const oldTripData = await AsyncStorage.getItem("Trip");
    if (oldTripData !== null) {
      const opdTripDataParse = JSON.parse(oldTripData);
      newTrips = [...opdTripDataParse];
    }

    //Save data trip to local storage
    newTrips = [...newTrips, trip];
    await AsyncStorage.setItem("Trip", JSON.stringify(newTrips));

    return newTrips;
  }
);

export const getTrips = createAsyncThunk("trip/getTrips", async () => {
  let newTrips: ITrip[] = [];

  //Get data trips from local storage
  const trips = await AsyncStorage.getItem("Trip");

  if (trips !== null) {
    newTrips = JSON.parse(trips);
  }

  return newTrips;
});

export const deleteTrip = createAsyncThunk(
  "trip/deleteTrip",
  async (idTrip: string) => {
    let newTrips: ITrip[] = [];

    //Get data trips from local storage
    const trips = await AsyncStorage.getItem("Trip");

    if (trips !== null) {
      const tripParse: ITrip[] = JSON.parse(trips);

      //Delete item trip
      newTrips = tripParse.filter((item) => item.id !== idTrip);
    }

    //Set again value trips to local
    await AsyncStorage.setItem("Trip", JSON.stringify(newTrips));

    return newTrips;
  }
);

export const searchTrip = createAsyncThunk(
  "trip/searchTrip",
  async (textSearch: string) => {
    let resultTrips: ITrip[] = [];

    //Get data trips from local storage
    const trips = await AsyncStorage.getItem("Trip");

    if (trips !== null) {
      const tripParse: ITrip[] = JSON.parse(trips);

      //find item trip match text search
      resultTrips = tripParse.filter((item) =>
        item.name.includes(textSearch.trim())
      );
    }

    return resultTrips;
  }
);

export const filterTrip = createAsyncThunk(
  "trip/filterTrip",
  async ({
    name,
    date,
    destination,
  }: {
    name: string | null;
    date: string | null;
    destination: string | null;
  }) => {
    let resultTrips: ITrip[] = [];

    //Get data trips from local storage
    const trips = await AsyncStorage.getItem("Trip");

    if (trips !== null) {
      const tripParse: ITrip[] = JSON.parse(trips);

      //find item trip match text search
      resultTrips = tripParse.filter((item) => {
        let isMatchItem: boolean = true;

        if (
          (name && !item.name.includes(name)) ||
          (date && !item.date?.includes(date)) ||
          (destination && !item.destination.includes(destination))
        ) {
          isMatchItem = false;
        }

        return isMatchItem
      });
    }

    return resultTrips;
  }
);

export const updateTrip = createAsyncThunk(
  "trip/updateTrip",
  async ({ idTrip, dataUpdate }: { idTrip: string; dataUpdate: ITrip }) => {
    let newTrips: ITrip[] = [];

    //Get data trips from local storage
    const trips = await AsyncStorage.getItem("Trip");

    if (trips !== null) {
      const tripParse: ITrip[] = JSON.parse(trips);

      //Update item trip
      newTrips = tripParse.map((item) => {
        if (item.id === idTrip) {
          const tripUpdate: ITrip = {
            ...dataUpdate,
            id: idTrip,
          };

          return tripUpdate;
        }
        return item;
      });
    }

    //Set again value trips to local
    await AsyncStorage.setItem("Trip", JSON.stringify(newTrips));

    return newTrips;
  }
);

export const resetTrips = createAsyncThunk(
  "expense/resetTrips",
  async () => {
    await AsyncStorage.setItem("Trip", JSON.stringify([]));
    return true;
  }
);

interface IState {
  trips: ITrip[];
  tripSelected: ITrip | null;
}

const initialState: IState = {
  trips: [],
  tripSelected: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip(state, action: PayloadAction<{ trips: ITrip[] }>) {
      state.trips = action.payload.trips;
    },
    setTripSelected(state, action: PayloadAction<{ trip: ITrip }>) {
      state.tripSelected = action.payload.trip;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTrip.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = action.payload;
        }
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = action.payload;
        }
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = action.payload;
        }
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = action.payload;
        }
      })
      .addCase(searchTrip.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = action.payload;
        }
      }).addCase(filterTrip.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = action.payload;
        }
      }).addCase(resetTrips.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.trips = [];
          state.tripSelected = null;
        }
      });
  },
});

export const { setTrip, setTripSelected } = tripSlice.actions;
export default tripSlice.reducer;
