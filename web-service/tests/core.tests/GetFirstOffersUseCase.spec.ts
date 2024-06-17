import { Offre } from "../../src/core/entities/Offre";
import { IOfferRepository } from "../../src/core/ports/persistence/IOfferRepository";
import { OfferRepository } from "../../src/infrastructure/spi/OfferRepository";

describe("Get first offers", () => {
    it("Should get first offers", async () => {
        const offerRepository: IOfferRepository = new OfferRepository();
        const offers: Offre[] = await offerRepository.execute(3);
        expect(offers.length).toBe(3);
    });
});
