import { store } from "@graphprotocol/graph-ts";
import {
  OrderCreated as OrderCreatedEvent,
  OrderProcessed as OrderProcessedEvent,
  OrderDeleted as OrderDeletedEvent,
  OrderUpdated as OrderUpdatedEvent
} from "../generated/OrderbookExtended/OrderbookExtended"
import {
  Orderbook
} from "../generated/schema"

export function handleOrderCreated(event: OrderCreatedEvent): void {
  let entity = new Orderbook(
    event.params.id
  )

  entity.OrderbookExtended_id = event.params.id;
  entity.sender = event.params.sender;
  entity.tokenId = event.params.tokenId;
  entity.price = event.params.price;
  entity.amount = event.params.amount;
  entity.createdAt = event.params.createdAt;
  entity.orderType = event.params.orderType;
  entity.processed = false;

  entity.blockNumber = event.params.createdAt;
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderProcessed(event: OrderProcessedEvent): void {
  let entity = Orderbook.load(event.params.id)

  if (entity == null) {
    throw new Error("Order not found");
  }

  entity.processed = true;
  entity.save();
}

export function handleOrderDeleted(event: OrderDeletedEvent): void {
  let entity = Orderbook.load(event.params.id)

  if (entity == null) {
    throw new Error("Order not found");
  }

  entity.processed = true;
  entity.save();
}

export function handleOrderUpdated(event: OrderUpdatedEvent): void {
  let entity = Orderbook.load(event.params.id)

  if (entity == null) {
    throw new Error("Order not found");
  }

  entity.amount = event.params.amount;
  entity.save();
}