import React from "react";
import { TripType } from "./Types";
import Bus from "../assets/images/bkk_bus.svg";
import Tram from "../assets/images/bkk_tram.svg";
import Trolley from "../assets/images/bkk_trolley.svg";
import Train from "../assets/images/bkk_train.svg";
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
    case "TROLLEYBUS":
      return <Trolley width={size} height={size} />;
    case "RAIL":
      return <Train width={size} height={size} />;
    default:
      return <Night width={size} height={size} />;
  }
};
