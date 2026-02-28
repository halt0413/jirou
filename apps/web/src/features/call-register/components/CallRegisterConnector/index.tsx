"use client";

import { useCallRegister } from "../../hooks/useCallRegister";
import { CallRegisterPage } from "../CallRegisterContainer";

export const CallRegisterConnector = () => {
  const vm = useCallRegister();
  return (
    <CallRegisterPage
      menu={vm.menu}
      onMenuChange={vm.setMenu}
      ninnikuLevels={vm.NINNIKU_LEVELS}
      yasaiLevels={vm.YASAI_LEVELS}
      aburaLevels={vm.ABURA_LEVELS}
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
      isIssuing={vm.isIssuing}
    />
  );
};
