import Participate from "../modals/Participate.js";
import { useState, useEffect } from "react";
import TopHeader from "./TopHeader.js";

export default function TopBanner() {
  const [participateVisible, setParticipateVisible] = useState(false);

  return (
    <>
      {/* <TopHeader trigger={setParticipateVisible} /> */}
      <Participate
        show={participateVisible}
        onHide={() => setParticipateVisible(false)}
      />
    </>
  );
}
