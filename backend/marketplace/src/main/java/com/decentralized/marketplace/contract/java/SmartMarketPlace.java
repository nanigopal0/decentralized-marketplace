package com.decentralized.marketplace.contract.java;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tuples.generated.Tuple6;
import org.web3j.tuples.generated.Tuple8;
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
public class SmartMarketPlace extends Contract {
    public static final String BINARY = "6080604052603c600355603c6004553480156018575f5ffd5b50611a40806100265f395ff3fe6080604052600436106100a5575f3560e01c8063712ca0f811610062578063712ca0f8146101945780639e0863b2146101c7578063a0622f4e146101e6578063a4506460146101f9578063bf67a11514610218578063dc9c50351461024f575f5ffd5b80630186a423146100a957806306e0577e146100e15780631a948947146101025780632fe7d9b4146101335780633619710314610152578063514a78c414610175575b5f5ffd5b3480156100b4575f5ffd5b506100c86100c3366004611589565b610264565b6040516100d89493929190611619565b60405180910390f35b3480156100ec575f5ffd5b506101006100fb366004611589565b61032b565b005b34801561010d575f5ffd5b5061012161011c366004611589565b6105ee565b6040516100d896959493929190611669565b34801561013e575f5ffd5b5061010061014d366004611589565b61074e565b34801561015d575f5ffd5b5061016760035481565b6040519081526020016100d8565b348015610180575f5ffd5b5061010061018f3660046116c0565b6108ce565b34801561019f575f5ffd5b506101b36101ae366004611589565b6109ea565b6040516100d898979695949392919061171a565b3480156101d2575f5ffd5b506101006101e1366004611589565b610cef565b6101006101f436600461177e565b610ebf565b348015610204575f5ffd5b50610100610213366004611589565b61121a565b348015610223575f5ffd5b50610167610232366004611589565b805160208183018101805160028252928201919093012091525481565b34801561025a575f5ffd5b5061016760045481565b80516020818301810180515f82529282019190930120915280548190610289906117e3565b80601f01602080910402602001604051908101604052809291908181526020018280546102b5906117e3565b80156103005780601f106102d757610100808354040283529160200191610300565b820191905f5260205f20905b8154815290600101906020018083116102e357829003601f168201915b505050506001830154600284015460039094015492936001600160a01b039091169290915060ff1684565b5f60018260405161033c919061181b565b90815260405190819003602001902090506002600382015460ff166004811115610368576103686115f1565b146103ae5760405162461bcd60e51b815260206004820152601160248201527013dc99195c881b9bdd081cda1a5c1c1959607a1b60448201526064015b60405180910390fd5b60045481600501546103c09190611831565b421161040e5760405162461bcd60e51b815260206004820152601c60248201527f44656c69766572792074696d656f7574206e6f7420726561636865640000000060448201526064016103a5565b6003818101805460ff191660018302179055505f600283604051610432919061181b565b90815260200160405180910390205490505f600284604051610454919061181b565b9081526020016040518091039020819055505f5f836002016040516104799190611856565b90815260200160405180910390206040518060800160405290815f820180546104a1906117e3565b80601f01602080910402602001604051908101604052809291908181526020018280546104cd906117e3565b80156105185780601f106104ef57610100808354040283529160200191610518565b820191905f5260205f20905b8154815290600101906020018083116104fb57829003601f168201915b50505091835250506001828101546001600160a01b0316602083015260028301546040830152600383015460609092019160ff169081111561055c5761055c6115f1565b600181111561056d5761056d6115f1565b90525060208101516040519192506001600160a01b03169083156108fc029084905f818181858888f193505050501580156105aa573d5f5f3e3d5ffd5b50836040516105b9919061181b565b604051908190038120907f4296b5b4fd7b9a74af4b8b4ad50b840ac7321f95071e49eede24916d5e4a4d42905f90a250505050565b8051602081830181018051600182529282019190930120915280548190610614906117e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610640906117e3565b801561068b5780601f106106625761010080835404028352916020019161068b565b820191905f5260205f20905b81548152906001019060200180831161066e57829003601f168201915b505050600184015460028501805494956001600160a01b039092169491935091506106b5906117e3565b80601f01602080910402602001604051908101604052809291908181526020018280546106e1906117e3565b801561072c5780601f106107035761010080835404028352916020019161072c565b820191905f5260205f20905b81548152906001019060200180831161070f57829003601f168201915b5050505060038301546004840154600590940154929360ff9091169290915086565b805f600182604051610760919061181b565b908152602001604051809103902060020160405161077e9190611856565b90815260405190819003602001902060010154336001600160a01b03909116146107df5760405162461bcd60e51b81526020600482015260126024820152712737ba10383937b23ab1ba1039b2b63632b960711b60448201526064016103a5565b5f6001836040516107f0919061181b565b90815260405190819003602001902090506001600382015460ff16600481111561081c5761081c6115f1565b146108775760405162461bcd60e51b815260206004820152602560248201527f4f72646572206e6f74206163636570746564206f7220616c72656164792073686044820152641a5c1c195960da1b60648201526084016103a5565b60038101805460ff1916600217905542600582015560405161089a90849061181b565b604051908190038120907f9dbe2d347001eec4f99473edc6161746246c3bd920ebc7aec9ea509774a6a87c905f90a2505050565b6040518060800160405280848152602001336001600160a01b03168152602001838152602001826001811115610906576109066115f1565b8152505f84604051610918919061181b565b908152604051908190036020019020815181906109359082611913565b506020820151600182810180546001600160a01b0319166001600160a01b03909316929092179091556040830151600283015560608301516003830180549192909160ff191690838181111561098d5761098d6115f1565b0217905550506040513391506109a490859061181b565b60405180910390207f31b13c589f83a80249009332d22626c5c6eb26013d1fdc569451bf07990be95084846040516109dd9291906119ce565b60405180910390a3505050565b5f5f60605f5f5f5f5f5f60018a604051610a04919061181b565b90815260200160405180910390206040518060c00160405290815f82018054610a2c906117e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610a58906117e3565b8015610aa35780601f10610a7a57610100808354040283529160200191610aa3565b820191905f5260205f20905b815481529060010190602001808311610a8657829003601f168201915b505050918352505060018201546001600160a01b03166020820152600282018054604090920191610ad3906117e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610aff906117e3565b8015610b4a5780601f10610b2157610100808354040283529160200191610b4a565b820191905f5260205f20905b815481529060010190602001808311610b2d57829003601f168201915b5050509183525050600382015460209091019060ff166004811115610b7157610b716115f1565b6004811115610b8257610b826115f1565b81526020016004820154815260200160058201548152505090505f5f8260400151604051610bb0919061181b565b90815260200160405180910390206040518060800160405290815f82018054610bd8906117e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610c04906117e3565b8015610c4f5780601f10610c2657610100808354040283529160200191610c4f565b820191905f5260205f20905b815481529060010190602001808311610c3257829003601f168201915b50505091835250506001828101546001600160a01b0316602083015260028301546040830152600383015460609092019160ff1690811115610c9357610c936115f1565b6001811115610ca457610ca46115f1565b81525050905081602001518160200151836040015183604001518460600151866060015187608001518860a00151995099509950995099509950995099505050919395975091939597565b5f600182604051610d00919061181b565b90815260405190819003602001902090506001600382015460ff166004811115610d2c57610d2c6115f1565b14610d795760405162461bcd60e51b815260206004820152601b60248201527f4f72646572206e6f7420696e206163636570746564207374617465000000000060448201526064016103a5565b6003548160040154610d8b9190611831565b4211610dd95760405162461bcd60e51b815260206004820152601c60248201527f5368697070696e672074696d656f7574206e6f7420726561636865640000000060448201526064016103a5565b60038101805460ff191660041790556040515f90600290610dfb90859061181b565b90815260200160405180910390205490505f600284604051610e1d919061181b565b9081526040519081900360200181209190915560018301546001600160a01b03169082156108fc029083905f818181858888f19350505050158015610e64573d5f5f3e3d5ffd5b5082604051610e73919061181b565b60405190819003812060018401546001600160a01b03168252907f38c92b09d1115eaf071b4bb25cd235f42da597d8efc4d462aee6f74b8e4cd08a9060200160405180910390a2505050565b5f5f83604051610ecf919061181b565b90815260200160405180910390206040518060800160405290815f82018054610ef7906117e3565b80601f0160208091040260200160405190810160405280929190818152602001828054610f23906117e3565b8015610f6e5780601f10610f4557610100808354040283529160200191610f6e565b820191905f5260205f20905b815481529060010190602001808311610f5157829003601f168201915b50505091835250506001828101546001600160a01b0316602083015260028301546040830152600383015460609092019160ff1690811115610fb257610fb26115f1565b6001811115610fc357610fc36115f1565b905250604081015190915082906110145760405162461bcd60e51b8152602060048201526015602482015274141c9bd91d58dd08191bd95cdb89dd08195e1a5cdd605a1b60448201526064016103a5565b8160400151341461105c5760405162461bcd60e51b8152602060048201526012602482015271125b98dbdc9c9958dd08115512081cd95b9d60721b60448201526064016103a5565b3460028260405161106d919061181b565b9081526020016040518091039020819055506040518060c00160405280828152602001336001600160a01b03168152602001858152602001600160048111156110b8576110b86115f1565b81526020014281526020015f8152506001826040516110d7919061181b565b908152604051908190036020019020815181906110f49082611913565b5060208201516001820180546001600160a01b0319166001600160a01b039092169190911790556040820151600282019061112f9082611913565b50606082015160038201805460ff19166001836004811115611153576111536115f1565b02179055506080820151600482015560a090910151600590910155604051339061117e90839061181b565b60405180910390207f606cbd6650a6ec6998bbfce7c8040b605d2eb43aa772c5825118d427ce7bd4e086346040516111b79291906119e9565b60405180910390a3806040516111cd919061181b565b6040519081900381206020808501516001600160a01b0316835290917fa0e03bb71527def2b78ab405cb1a0371db00c44de12d7ba54e7292c4181646bc910160405180910390a250505050565b8060018160405161122b919061181b565b90815260405190819003602001902060010154336001600160a01b03909116146112875760405162461bcd60e51b815260206004820152600d60248201526c2737ba103a343290313abcb2b960991b60448201526064016103a5565b5f600183604051611298919061181b565b90815260405190819003602001902090506002600382015460ff1660048111156112c4576112c46115f1565b146113095760405162461bcd60e51b815260206004820152601560248201527413dc99195c881b9bdd081e595d081cda1a5c1c1959605a1b60448201526064016103a5565b6003818101805460ff191660018302179055505f60028460405161132d919061181b565b90815260200160405180910390205490505f60028560405161134f919061181b565b9081526020016040518091039020819055505f5f836002016040516113749190611856565b90815260200160405180910390206040518060800160405290815f8201805461139c906117e3565b80601f01602080910402602001604051908101604052809291908181526020018280546113c8906117e3565b80156114135780601f106113ea57610100808354040283529160200191611413565b820191905f5260205f20905b8154815290600101906020018083116113f657829003601f168201915b50505091835250506001828101546001600160a01b0316602083015260028301546040830152600383015460609092019160ff1690811115611457576114576115f1565b6001811115611468576114686115f1565b90525060208101516040519192506001600160a01b03169083156108fc029084905f818181858888f193505050501580156114a5573d5f5f3e3d5ffd5b50846040516114b4919061181b565b604051908190038120907f4296b5b4fd7b9a74af4b8b4ad50b840ac7321f95071e49eede24916d5e4a4d42905f90a25050505050565b634e487b7160e01b5f52604160045260245ffd5b5f82601f83011261150d575f5ffd5b813567ffffffffffffffff811115611527576115276114ea565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715611556576115566114ea565b60405281815283820160200185101561156d575f5ffd5b816020850160208301375f918101602001919091529392505050565b5f60208284031215611599575f5ffd5b813567ffffffffffffffff8111156115af575f5ffd5b6115bb848285016114fe565b949350505050565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b5f52602160045260245ffd5b60028110611615576116156115f1565b9052565b608081525f61162b60808301876115c3565b6001600160a01b03861660208401526040830185905290506116506060830184611605565b95945050505050565b60058110611615576116156115f1565b60c081525f61167b60c08301896115c3565b6001600160a01b0388166020840152828103604084015261169c81886115c3565b9150506116ac6060830186611659565b608082019390935260a00152949350505050565b5f5f5f606084860312156116d2575f5ffd5b833567ffffffffffffffff8111156116e8575f5ffd5b6116f4868287016114fe565b9350506020840135915060408401356002811061170f575f5ffd5b809150509250925092565b6001600160a01b03898116825288166020820152610100604082018190525f90611746908301896115c3565b905086606083015261175b6080830187611605565b61176860a0830186611659565b60c082019390935260e001529695505050505050565b5f5f6040838503121561178f575f5ffd5b823567ffffffffffffffff8111156117a5575f5ffd5b6117b1858286016114fe565b925050602083013567ffffffffffffffff8111156117cd575f5ffd5b6117d9858286016114fe565b9150509250929050565b600181811c908216806117f757607f821691505b60208210810361181557634e487b7160e01b5f52602260045260245ffd5b50919050565b5f82518060208501845e5f920191825250919050565b8082018082111561185057634e487b7160e01b5f52601160045260245ffd5b92915050565b5f5f8354611863816117e3565b60018216801561187a576001811461188f576118bc565b60ff19831686528115158202860193506118bc565b865f5260205f205f5b838110156118b457815488820152600190910190602001611898565b505081860193505b509195945050505050565b601f82111561190e57805f5260205f20601f840160051c810160208510156118ec5750805b601f840160051c820191505b8181101561190b575f81556001016118f8565b50505b505050565b815167ffffffffffffffff81111561192d5761192d6114ea565b6119418161193b84546117e3565b846118c7565b6020601f821160018114611973575f831561195c5750848201515b5f19600385901b1c1916600184901b17845561190b565b5f84815260208120601f198516915b828110156119a25787850151825560209485019460019092019101611982565b50848210156119bf57868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b828152604081016119e26020830184611605565b9392505050565b604081525f6119fb60408301856115c3565b9050826020830152939250505056fea264697066735822122032eeeb32c46780b5a1f620542a4f5d442af50241c88ad60ca1dbb31a7249989e64736f6c634300081d0033";

    public static final String FUNC_CONFIRMDELIVERY = "confirmDelivery";

    public static final String FUNC_CONFIRMSHIPMENT = "confirmShipment";

    public static final String FUNC_DELIVERYTIMEOUT = "deliveryTimeout";

    public static final String FUNC_ESCROW = "escrow";

    public static final String FUNC_GETORDER = "getOrder";

    public static final String FUNC_LISTPRODUCT = "listProduct";

    public static final String FUNC_ORDERS = "orders";

    public static final String FUNC_PRODUCTS = "products";

    public static final String FUNC_PURCHASEPRODUCT = "purchaseProduct";

    public static final String FUNC_REFUNDIFNOTSHIPPED = "refundIfNotShipped";

    public static final String FUNC_RELEASEIFNOTCONFIRMED = "releaseIfNotConfirmed";

    public static final String FUNC_SHIPPINGTIMEOUT = "shippingTimeout";

    public static final Event ORDERACCEPTED_EVENT = new Event("OrderAccepted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>(true) {}, new TypeReference<Address>() {}));
    ;

    public static final Event PRODUCTDELIVERED_EVENT = new Event("ProductDelivered", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>(true) {}));
    ;

    public static final Event PRODUCTLISTED_EVENT = new Event("ProductListed", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}));
    ;

    public static final Event PRODUCTPURCHASED_EVENT = new Event("ProductPurchased", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event PRODUCTSHIPPED_EVENT = new Event("ProductShipped", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>(true) {}));
    ;

    public static final Event REFUNDED_EVENT = new Event("Refunded", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>(true) {}, new TypeReference<Address>() {}));
    ;

    @Deprecated
    protected SmartMarketPlace(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected SmartMarketPlace(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected SmartMarketPlace(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected SmartMarketPlace(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<OrderAcceptedEventResponse> getOrderAcceptedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(ORDERACCEPTED_EVENT, transactionReceipt);
        ArrayList<OrderAcceptedEventResponse> responses = new ArrayList<OrderAcceptedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            OrderAcceptedEventResponse typedResponse = new OrderAcceptedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.seller = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static OrderAcceptedEventResponse getOrderAcceptedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(ORDERACCEPTED_EVENT, log);
        OrderAcceptedEventResponse typedResponse = new OrderAcceptedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.seller = (String) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<OrderAcceptedEventResponse> orderAcceptedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getOrderAcceptedEventFromLog(log));
    }

    public Flowable<OrderAcceptedEventResponse> orderAcceptedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(ORDERACCEPTED_EVENT));
        return orderAcceptedEventFlowable(filter);
    }

    public static List<ProductDeliveredEventResponse> getProductDeliveredEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PRODUCTDELIVERED_EVENT, transactionReceipt);
        ArrayList<ProductDeliveredEventResponse> responses = new ArrayList<ProductDeliveredEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProductDeliveredEventResponse typedResponse = new ProductDeliveredEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductDeliveredEventResponse getProductDeliveredEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTDELIVERED_EVENT, log);
        ProductDeliveredEventResponse typedResponse = new ProductDeliveredEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ProductDeliveredEventResponse> productDeliveredEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProductDeliveredEventFromLog(log));
    }

    public Flowable<ProductDeliveredEventResponse> productDeliveredEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PRODUCTDELIVERED_EVENT));
        return productDeliveredEventFlowable(filter);
    }

    public static List<ProductListedEventResponse> getProductListedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PRODUCTLISTED_EVENT, transactionReceipt);
        ArrayList<ProductListedEventResponse> responses = new ArrayList<ProductListedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProductListedEventResponse typedResponse = new ProductListedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.productId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.seller = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.productType = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductListedEventResponse getProductListedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTLISTED_EVENT, log);
        ProductListedEventResponse typedResponse = new ProductListedEventResponse();
        typedResponse.log = log;
        typedResponse.productId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.seller = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.price = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.productType = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<ProductListedEventResponse> productListedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProductListedEventFromLog(log));
    }

    public Flowable<ProductListedEventResponse> productListedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PRODUCTLISTED_EVENT));
        return productListedEventFlowable(filter);
    }

    public static List<ProductPurchasedEventResponse> getProductPurchasedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PRODUCTPURCHASED_EVENT, transactionReceipt);
        ArrayList<ProductPurchasedEventResponse> responses = new ArrayList<ProductPurchasedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProductPurchasedEventResponse typedResponse = new ProductPurchasedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.buyer = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.productId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductPurchasedEventResponse getProductPurchasedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTPURCHASED_EVENT, log);
        ProductPurchasedEventResponse typedResponse = new ProductPurchasedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.buyer = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.productId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
        return typedResponse;
    }

    public Flowable<ProductPurchasedEventResponse> productPurchasedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProductPurchasedEventFromLog(log));
    }

    public Flowable<ProductPurchasedEventResponse> productPurchasedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PRODUCTPURCHASED_EVENT));
        return productPurchasedEventFlowable(filter);
    }

    public static List<ProductShippedEventResponse> getProductShippedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(PRODUCTSHIPPED_EVENT, transactionReceipt);
        ArrayList<ProductShippedEventResponse> responses = new ArrayList<ProductShippedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ProductShippedEventResponse typedResponse = new ProductShippedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductShippedEventResponse getProductShippedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTSHIPPED_EVENT, log);
        ProductShippedEventResponse typedResponse = new ProductShippedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ProductShippedEventResponse> productShippedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getProductShippedEventFromLog(log));
    }

    public Flowable<ProductShippedEventResponse> productShippedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(PRODUCTSHIPPED_EVENT));
        return productShippedEventFlowable(filter);
    }

    public static List<RefundedEventResponse> getRefundedEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(REFUNDED_EVENT, transactionReceipt);
        ArrayList<RefundedEventResponse> responses = new ArrayList<RefundedEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            RefundedEventResponse typedResponse = new RefundedEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.buyer = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static RefundedEventResponse getRefundedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(REFUNDED_EVENT, log);
        RefundedEventResponse typedResponse = new RefundedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (byte[]) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.buyer = (String) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<RefundedEventResponse> refundedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getRefundedEventFromLog(log));
    }

    public Flowable<RefundedEventResponse> refundedEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(REFUNDED_EVENT));
        return refundedEventFlowable(filter);
    }

    public RemoteFunctionCall<TransactionReceipt> confirmDelivery(String orderId) {
        final Function function = new Function(
                FUNC_CONFIRMDELIVERY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> confirmShipment(String orderId) {
        final Function function = new Function(
                FUNC_CONFIRMSHIPMENT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> deliveryTimeout() {
        final Function function = new Function(FUNC_DELIVERYTIMEOUT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> escrow(String param0) {
        final Function function = new Function(FUNC_ESCROW, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple8<String, String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>> getOrder(String orderId) {
        final Function function = new Function(FUNC_GETORDER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(orderId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}, new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple8<String, String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>>(function,
                new Callable<Tuple8<String, String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple8<String, String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple8<String, String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue(), 
                                (BigInteger) results.get(5).getValue(), 
                                (BigInteger) results.get(6).getValue(), 
                                (BigInteger) results.get(7).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> listProduct(String productId, BigInteger price, BigInteger productType) {
        final Function function = new Function(
                FUNC_LISTPRODUCT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(productId), 
                new org.web3j.abi.datatypes.generated.Uint256(price), 
                new org.web3j.abi.datatypes.generated.Uint8(productType)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple6<String, String, String, BigInteger, BigInteger, BigInteger>> orders(String param0) {
        final Function function = new Function(FUNC_ORDERS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Address>() {}, new TypeReference<Utf8String>() {}, new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple6<String, String, String, BigInteger, BigInteger, BigInteger>>(function,
                new Callable<Tuple6<String, String, String, BigInteger, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple6<String, String, String, BigInteger, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple6<String, String, String, BigInteger, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (String) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue(), 
                                (BigInteger) results.get(5).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Tuple4<String, String, BigInteger, BigInteger>> products(String param0) {
        final Function function = new Function(FUNC_PRODUCTS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}));
        return new RemoteFunctionCall<Tuple4<String, String, BigInteger, BigInteger>>(function,
                new Callable<Tuple4<String, String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple4<String, String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<String, String, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> purchaseProduct(String productId, String orderId, BigInteger weiValue) {
        final Function function = new Function(
                FUNC_PURCHASEPRODUCT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(productId), 
                new org.web3j.abi.datatypes.Utf8String(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<TransactionReceipt> refundIfNotShipped(String orderId) {
        final Function function = new Function(
                FUNC_REFUNDIFNOTSHIPPED, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> releaseIfNotConfirmed(String orderId) {
        final Function function = new Function(
                FUNC_RELEASEIFNOTCONFIRMED, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> shippingTimeout() {
        final Function function = new Function(FUNC_SHIPPINGTIMEOUT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    @Deprecated
    public static SmartMarketPlace load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new SmartMarketPlace(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static SmartMarketPlace load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new SmartMarketPlace(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static SmartMarketPlace load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new SmartMarketPlace(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static SmartMarketPlace load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new SmartMarketPlace(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<SmartMarketPlace> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(SmartMarketPlace.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<SmartMarketPlace> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(SmartMarketPlace.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    public static RemoteCall<SmartMarketPlace> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(SmartMarketPlace.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<SmartMarketPlace> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(SmartMarketPlace.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    public static class OrderAcceptedEventResponse extends BaseEventResponse {
        public byte[] orderId;

        public String seller;
    }

    public static class ProductDeliveredEventResponse extends BaseEventResponse {
        public byte[] orderId;
    }

    public static class ProductListedEventResponse extends BaseEventResponse {
        public byte[] productId;

        public String seller;

        public BigInteger price;

        public BigInteger productType;
    }

    public static class ProductPurchasedEventResponse extends BaseEventResponse {
        public byte[] orderId;

        public String buyer;

        public String productId;

        public BigInteger amount;
    }

    public static class ProductShippedEventResponse extends BaseEventResponse {
        public byte[] orderId;
    }

    public static class RefundedEventResponse extends BaseEventResponse {
        public byte[] orderId;

        public String buyer;
    }
}
