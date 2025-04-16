package com.decentralized.marketplace.contract.java;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.10.3.
 */
@SuppressWarnings("rawtypes")
public class Demo extends Contract {
    public static final String BINARY = "6080604052348015600e575f5ffd5b5061043b8061001c5f395ff3fe608060405234801561000f575f5ffd5b5060043610610034575f3560e01c80636f77926b14610038578063d3bddc2b14610062575b5f5ffd5b61004b610046366004610194565b610077565b6040516100599291906101c1565b60405180910390f35b610075610070366004610211565b610153565b005b60605f5f5f5f856001600160a01b03166001600160a01b031681526020019081526020015f206040518060400160405290815f820180546100b7906102c6565b80601f01602080910402602001604051908101604052809291908181526020018280546100e3906102c6565b801561012e5780601f106101055761010080835404028352916020019161012e565b820191905f5260205f20905b81548152906001019060200180831161011157829003601f168201915b5050509183525050600191909101546020918201528151910151909590945092505050565b6040805180820182528381526020808201849052335f908152908190529190912081518190610182908261034a565b50602082015181600101559050505050565b5f602082840312156101a4575f5ffd5b81356001600160a01b03811681146101ba575f5ffd5b9392505050565b604081525f83518060408401528060208601606085015e5f606082850101526060601f19601f8301168401019150508260208301529392505050565b634e487b7160e01b5f52604160045260245ffd5b5f5f60408385031215610222575f5ffd5b823567ffffffffffffffff811115610238575f5ffd5b8301601f81018513610248575f5ffd5b803567ffffffffffffffff811115610262576102626101fd565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715610291576102916101fd565b6040528181528282016020018710156102a8575f5ffd5b816020840160208301375f6020928201830152969401359450505050565b600181811c908216806102da57607f821691505b6020821081036102f857634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561034557805f5260205f20601f840160051c810160208510156103235750805b601f840160051c820191505b81811015610342575f815560010161032f565b50505b505050565b815167ffffffffffffffff811115610364576103646101fd565b6103788161037284546102c6565b846102fe565b6020601f8211600181146103aa575f83156103935750848201515b5f19600385901b1c1916600184901b178455610342565b5f84815260208120601f198516915b828110156103d957878501518255602094850194600190920191016103b9565b50848210156103f657868401515f19600387901b60f8161c191681555b50505050600190811b0190555056fea26469706673582212209d1188c1463d64a3805164d25b0aaedc2a4abb547a3ddf8ae2a7c310a42a3daa64736f6c634300081d0033";

    public static final String FUNC_GETUSER = "getUser";

    public static final String FUNC_SETUSER = "setUser";

    @Deprecated
    protected Demo(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Demo(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Demo(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Demo(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<Tuple2<String, BigInteger>> getUser(String userAddr) {
        final Function function = new Function(FUNC_GETUSER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, userAddr)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple2<String, BigInteger>>(function,
                new Callable<Tuple2<String, BigInteger>>() {
                    @Override
                    public Tuple2<String, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<String, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (BigInteger) results.get(1).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> setUser(String name, BigInteger age) {
        final Function function = new Function(
                FUNC_SETUSER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(name), 
                new org.web3j.abi.datatypes.generated.Uint256(age)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static Demo load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Demo(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Demo load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Demo(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Demo load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Demo(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Demo load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Demo(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Demo> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Demo.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Demo> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Demo.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<Demo> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(Demo.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<Demo> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(Demo.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }
}
