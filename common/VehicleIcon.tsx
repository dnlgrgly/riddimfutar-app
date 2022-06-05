import React from "react";
import { Vehicle } from "./Types";
import Bus from "../assets/svg/bkk_bus.svg";
import Tram from "../assets/svg/bkk_tram.svg";
import Trolley from "../assets/svg/bkk_trolley.svg";
import Night from "../assets/svg/bkk_night.svg";

type Props = {
  vehicle: Vehicle;
  size?: number;
};

export const VehicleIcon = ({ vehicle, size = 30 }: Props) => {
  switch (vehicle.type) {
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
