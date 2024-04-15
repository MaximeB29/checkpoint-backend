import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { GraphQLError } from "graphql";
import { Country } from "../entities/country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async getAllcountries(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryById(@Arg("id") id: number): Promise<Country | undefined> {
    const country = await Country.findOne({ where: { id } });
    if (!country) throw new GraphQLError("not found");
    return country;
  }

  @Query(() => [Country])
  async getCountriesByContinentCode(
    @Arg("continentCode") continentCode: string
  ) {
    return Country.find({ where: { continentCode } });
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode") continentCode: string
  ): Promise<Country> {
    let country = Country.create({ code, name, emoji, continentCode });
    await country.save();
    return country;
  }
}
