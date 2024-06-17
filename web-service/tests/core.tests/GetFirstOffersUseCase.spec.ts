import { Offre } from "../../src/core/entities/Offre";
import { IOfferRepository } from "../../src/core/ports/persistence/IOfferRepository";
import { OfferRepository } from "../../src/infrastructure/spi/repositories/OfferRepository";

describe("Get first offers use case", () => {
    it("Should get 3 first offers", async () => {
        const offerRepository: IOfferRepository = new OfferRepository();
        const offersRaw = await offerRepository.getFirstOffers(3);
        expect(offersRaw.length).toBe(3);
    });

    it("Should fetch the 3 first offers", async () => {});
});
