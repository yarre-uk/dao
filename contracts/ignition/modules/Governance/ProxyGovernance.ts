import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

import Governance from "./Governance";

export default buildModule("ProxyGovernance", (m) => {
  const _proxy = m.contract("MyProxy", []);
  const token = m.contract("GovernanceToken", [], {
    id: "Governance___FinalToken",
  });
  const governed = m.contract("Governed", [0, 0, 0], {
    id: "Governance___FinalGoverned",
  });
  const { governance } = m.useModule(Governance);

  m.call(_proxy, "setImplementation", [governance]);

  const proxyGovernance = m.contractAt("GovernanceExtended", _proxy, {
    id: "Governance___FinalProxy",
  });

  const owner = m.getAccount(0);
  const user = m.getAccount(1);
  const executer = m.getAccount(2);


  m.call(proxyGovernance, "initialize", [
    token,
    governed,
    executer,
    100,
    100,
    100,
  ]);

  m.call(governed, "setGovernor", [proxyGovernance]);

  m.call(token, "mint", [owner, ethers.parseEther("100")], {
    from: owner,
    id: "mint_owner",
  });
  m.call(token, "mint", [user, ethers.parseEther("100")], {
    from: owner,
    id: "mint_user",
  });
  m.call(token, "mint", [executer, ethers.parseEther("100")], {
    from: owner,
    id: "mint_executer",
  });

  m.call(token, "delegate", [user], { from: owner, id: "delegate_owner" });
  m.call(token, "delegate", [executer], { from: user, id: "delegate_user" });
  m.call(token, "delegate", [owner], {
    from: executer,
    id: "delegate_executer",
  });

  return { proxyGovernance, governed, token };
});
