"use client";

import { useCallRegister } from "../../hooks/useCallRegister";
import { CallRegisterPage } from "../CallRegisterContainer";

export const CallRegisterConnector = () => {
  const vm = useCallRegister();
  console.log("callLevels CONECTER", vm.CALL_LEVELS);
  return (
    <CallRegisterPage
      menu={vm.menu}
      onMenuChange={vm.setMenu}
      callLevels={vm.CALL_LEVELS}
      karameLevels={vm.KARAME_LEVELS}
      ninniku={vm.ninniku}
      yasai={vm.yasai}
      abura={vm.abura}
      karame={vm.karame}
      onNinnikuChange={vm.setNinniku}
      onYasaiChange={vm.setYasai}
      onAburaChange={vm.setAbura}
      onKarameChange={vm.setKarame}
      onIssue={vm.issueTicket}
    />
  );
};