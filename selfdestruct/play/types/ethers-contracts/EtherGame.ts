/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface EtherGameInterface extends utils.Interface {
  contractName: "EtherGame";
  functions: {
    "targetAmount()": FunctionFragment;
    "winner()": FunctionFragment;
    "deposit()": FunctionFragment;
    "claimReward()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "targetAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "winner", values?: undefined): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "targetAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "winner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;

  events: {};
}

export interface EtherGame extends BaseContract {
  contractName: "EtherGame";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: EtherGameInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    targetAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    winner(overrides?: CallOverrides): Promise<[string]>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  targetAmount(overrides?: CallOverrides): Promise<BigNumber>;

  winner(overrides?: CallOverrides): Promise<string>;

  deposit(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimReward(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    targetAmount(overrides?: CallOverrides): Promise<BigNumber>;

    winner(overrides?: CallOverrides): Promise<string>;

    deposit(overrides?: CallOverrides): Promise<void>;

    claimReward(overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    targetAmount(overrides?: CallOverrides): Promise<BigNumber>;

    winner(overrides?: CallOverrides): Promise<BigNumber>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    targetAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    winner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    deposit(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimReward(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
