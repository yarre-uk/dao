import {
  OrderCreated as OrderCreatedEvent,
  OrderProcessed as OrderProcessedEvent,
  OrderCanceled as OrderCanceledEvent
} from "../generated/MarketplaceExtended/MarketplaceExtended"
import {
  Order
} from "../generated/schema"

enum OrderStatus {
  Created,
  Processed,
  Canceled,
}

export function handleOrderCreated(event: OrderCreatedEvent): void {
  let entity = new Order(
    event.params.id
  )

  entity.MarketplaceExtended_id = event.params.id
  entity.sender = event.params.sender
  entity.orderType = event.params.orderType
  entity.orderStatus = OrderStatus.Created;
  entity.price = event.params.price;
  entity.createdAt = event.params.createdAt;
  entity.nftId = event.params.nftId;
  entity.signature = event.params.signature;
  entity.nonce = event.params.nonce;

  entity.blockNumber = event.params.createdAt;
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderProcessed(event: OrderProcessedEvent): void {
  let sellOrder = Order.load(event.params.sellOrderId)
  let buyOrder = Order.load(event.params.buyOrderId)


  if (sellOrder == null || buyOrder == null) {
    throw new Error("Order not found");
  }

  sellOrder.orderStatus = OrderStatus.Processed;
  buyOrder.orderStatus = OrderStatus.Processed;

  sellOrder.save();
  buyOrder.save();
}

export function handleOrderCanceled(event: OrderCanceledEvent): void {
  let entity = Order.load(event.params.id)

  if (entity == null) {
    throw new Error("Order not found");
  }

  entity.orderStatus = OrderStatus.Canceled;
  entity.save();
}