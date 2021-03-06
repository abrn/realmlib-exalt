import { Packet } from '../../packet';
import { PacketType } from '../../packet-type';
import { Reader } from '../../reader';
import { Writer } from '../../writer';

/**
 * Received when the active trade is changed
 */
export class TradeChangedPacket implements Packet {

  readonly type = PacketType.TRADECHANGED;

  /**
   * A description of which items in the trade partner's inventory are selected.
   * Items 0-3 are the hotbar items, and 4-12 are the 8 inventory slots.
   *
   * If a value is `true`, then the item is selected
   */
  offer: boolean[];

  constructor() {
    this.offer = [];
  }

  read(reader: Reader): void {
    const offerLen = reader.readShort();
    this.offer = new Array<boolean>(offerLen);
    for (let i = 0; i < offerLen; i++) {
      this.offer[i] = reader.readBoolean();
    }
  }

  write(writer: Writer): void {
    writer.writeShort(this.offer.length);
    for (const offer of this.offer) {
      writer.writeBoolean(offer);
    }
  }

  toString(): string {
    return `[TradeChanged] Offers: ${this.offer.length}\n
    Offers: ${this.offer.toString()}`;
  }
}
