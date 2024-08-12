
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }


  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    await this.pokemonModel.deleteMany();

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    // const pokemonToInsert: { name: string, no: number }[] = [];

    const pokemons = data.results.map( ({ name, url }) => ({
      name,
      no: +url.split('/')[6]
      // const no = +segments[segments.length - 2];
      // pokemonToInsert.push({ name, no });
    }));
    await this.pokemonModel.insertMany( pokemons );
    return 'Seed executed'
  }

}

