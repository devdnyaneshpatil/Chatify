import React, { useEffect, useState } from "react";
import axios from "axios";
import { chatState } from "../context/ChatProvider";
function Chat() {
  const user=chatState()
  return <div></div>;
}

export default Chat;
