import {
  ProposalCreated as ProposalCreatedEvent,
  ProposalProcessed as ProposalProcessedEvent,
} from "../generated/GovernanceExtended/GovernanceExtended"
import {
  Proposal
} from "../generated/schema"

enum ProposalStatus {
  Created,
  Processed,
  Canceled,
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let entity = new Proposal(
    event.params.id
  )

  entity.id = event.params.id;
  entity.owner = event.params.sender;
  entity.state = ProposalStatus.Created;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposalProcessed(event: ProposalProcessedEvent): void {
  let entity = Proposal.load(event.params.id);

  if (entity == null) {
    throw new Error("Proposal not found");
  }

  entity.state = event.params.state;
  entity.save();
}

// export function handleOrderCanceled(event: OrderCanceledEvent): void {
//   let entity = Order.load(event.params.id)

//   if (entity == null) {
//     throw new Error("Order not found");
//   }

//   entity.orderStatus = OrderStatus.Canceled;
//   entity.save();
// }
