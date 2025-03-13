"use client";

import { useState, useEffect, useCallback } from "react";

export interface INetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: "slow-2g" | "2g" | "3g" | "4g";
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown";

  onChange: (event: Event) => void;
}

export interface IUseNetworkState {
  /**
   * @desc Whether browser connected to the network or not.
   */
  online: boolean | undefined;
  /**
   * @desc Previous value of `online` property. Helps to identify if browser
   * just connected or lost connection.
   */
  previous: boolean | undefined;
  /**
   * @desc The {Date} object pointing to the moment when state change occurred.
   */
  since: Date | undefined;
  /**
   * @desc Effective bandwidth estimate in megabits per second, rounded to the
   * nearest multiple of 25 kilobits per seconds.
   */
  downlink: INetworkInformation["downlink"] | undefined;
  /**
   * @desc Maximum downlink speed, in megabits per second (Mbps), for the
   * underlying connection technology
   */
  downlinkMax: INetworkInformation["downlinkMax"] | undefined;
  /**
   * @desc Effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'.
   * This value is determined using a combination of recently observed round-trip time
   * and downlink values.
   */
  effectiveType: INetworkInformation["effectiveType"] | undefined;
  /**
   * @desc Estimated effective round-trip time of the current connection, rounded
   * to the nearest multiple of 25 milliseconds
   */
  rtt: INetworkInformation["rtt"] | undefined;
  /**
   * @desc {true} if the user has set a reduced data usage option on the user agent.
   */
  saveData: INetworkInformation["saveData"] | undefined;
  /**
   * @desc The type of connection a device is using to communicate with the network.
   * It will be one of the following values:
   *  - bluetooth
   *  - cellular
   *  - ethernet
   *  - none
   *  - wifi
   *  - wimax
   *  - other
   *  - unknown
   */
  type: INetworkInformation["type"] | undefined;
}

interface NavigatorWithConnection extends Navigator {
  connection?: INetworkInformation;
}

/**
 * Hook that tracks the state of the browser's network connection.
 *
 * @returns An object containing the current network state information
 */
export function useNetworkState(): IUseNetworkState {
  // Initial state with undefined values
  const [state, setState] = useState<IUseNetworkState>({
    online: undefined,
    previous: undefined,
    since: undefined,
    downlink: undefined,
    downlinkMax: undefined,
    effectiveType: undefined,
    rtt: undefined,
    saveData: undefined,
    type: undefined,
  });

  // Update all network state in one go
  const updateNetworkInfo = useCallback(() => {
    // Check if we're in a browser environment
    if (typeof navigator === "undefined") return;

    const online = navigator.onLine;
    const now = new Date();

    // Create the next state
    const nextState: IUseNetworkState = {
      online,
      previous: state.online,
      since: state.online !== online ? now : state.since,
      downlink: undefined,
      downlinkMax: undefined,
      effectiveType: undefined,
      rtt: undefined,
      saveData: undefined,
      type: undefined,
    };

    // Add Network Information API data if available
    const connection = (navigator as NavigatorWithConnection).connection as
      | INetworkInformation
      | undefined;
    if (connection) {
      nextState.downlink = connection.downlink;
      nextState.downlinkMax = connection.downlinkMax;
      nextState.effectiveType = connection.effectiveType;
      nextState.rtt = connection.rtt;
      nextState.saveData = connection.saveData;
      nextState.type = connection.type;
    }

    setState(nextState);
  }, [state.online, state.since]);

  // Set up event listeners for online/offline events
  useEffect(() => {
    // Skip if not in browser
    if (typeof window === "undefined") return;

    // Initial update
    updateNetworkInfo();

    // Listen for online/offline events
    window.addEventListener("online", updateNetworkInfo);
    window.addEventListener("offline", updateNetworkInfo);

    // Listen for connection changes if the API is available
    const connection = (navigator as NavigatorWithConnection).connection as
      | INetworkInformation
      | undefined;
    if (connection) {
      connection.addEventListener("change", updateNetworkInfo);
    }

    // Cleanup
    return () => {
      window.removeEventListener("online", updateNetworkInfo);
      window.removeEventListener("offline", updateNetworkInfo);

      if (connection) {
        connection.removeEventListener("change", updateNetworkInfo);
      }
    };
  }, [updateNetworkInfo]);

  return state;
}
