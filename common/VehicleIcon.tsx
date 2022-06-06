import React from "react";
import { TripType } from "./Types";
import Bus from "../assets/images/bkk_bus.svg";
import Tram from "../assets/images/bkk_tram.svg";
import Trolley from "../assets/images/bkk_trolley.svg";
import Night from "../assets/images/bkk_night.svg";

type Props = {
  type: TripType;
  size?: number;
};

export const VehicleIcon = ({ type, size = 30 }: Props) => {
  switch (type) {
    case "BUS":
      return <Bus width={size} height={size} />;
    case "TRAM":
      return <Tram width={size} height={size} />;
    case "TROLLEY":
      return <Trolley width={size} height={size} />;
    case "NIGHT":
      return <Night width={size} height={size} />;
  }
};
