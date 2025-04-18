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
    public static final String BINARY = "608060405260015f55600180556203f480600555620697806006553480156024575f5ffd5b50610ff9806100325f395ff3fe6080604052600436106100d9575f3560e01c806381b85eec1161007c578063d68ff19111610057578063d68ff191146102a2578063dc9c5035146102cd578063e0cb8e5f146102e2578063fd84cb9714610301575f5ffd5b806381b85eec146101df578063a85c38ef146101fe578063d09ef2411461026f575f5ffd5b806338e76a03116100b757806338e76a031461013b5780634de91a631461014e5780635899b55b146101625780637acc0b2014610181575f5ffd5b80632a58b330146100dd5780633619710314610105578063380587071461011a575b5f5ffd5b3480156100e8575f5ffd5b506100f260015481565b6040519081526020015b60405180910390f35b348015610110575f5ffd5b506100f260055481565b348015610125575f5ffd5b50610139610134366004610e1b565b610320565b005b610139610149366004610e1b565b6104ec565b348015610159575f5ffd5b506100f25f5481565b34801561016d575f5ffd5b5061013961017c366004610e1b565b61074b565b34801561018c575f5ffd5b506101cf61019b366004610e1b565b600260208190525f9182526040909120805460018201549282015460039092015490926001600160a01b0316919060ff1684565b6040516100fc9493929190610e5a565b3480156101ea575f5ffd5b506101396101f9366004610e8d565b6108c2565b348015610209575f5ffd5b5061025d610218366004610e1b565b600360208190525f918252604090912080546001820154600283015493830154600484015460059094015492946001600160a01b0390921693919260ff909116919086565b6040516100fc96959493929190610ece565b34801561027a575f5ffd5b5061028e610289366004610e1b565b6109ca565b6040516100fc989796959493929190610f0c565b3480156102ad575f5ffd5b506100f26102bc366004610e1b565b60046020525f908152604090205481565b3480156102d8575f5ffd5b506100f260065481565b3480156102ed575f5ffd5b506101396102fc366004610e1b565b610b1f565b34801561030c575f5ffd5b5061013961031b366004610e1b565b610c55565b5f8181526003602052604090206002600382015460ff16600481111561034857610348610e32565b1461038e5760405162461bcd60e51b815260206004820152601160248201527013dc99195c881b9bdd081cda1a5c1c1959607a1b60448201526064015b60405180910390fd5b60065481600501546103a09190610f77565b42116103ee5760405162461bcd60e51b815260206004820152601c60248201527f44656c69766572792074696d656f7574206e6f742072656163686564000000006044820152606401610385565b6003818101805460ff1916821790555f83815260046020908152604080832080549084905560028087015485528084528285208351608081018552815481526001828101546001600160a01b031696820196909652918101549382019390935294820154909492606084019160ff169081111561046d5761046d610e32565b600181111561047e5761047e610e32565b90525060208101516040519192506001600160a01b03169083156108fc029084905f818181858888f193505050501580156104bb573d5f5f3e3d5ffd5b5060405184907f676db0e373ff1071d39d7e4b8f731263eacae499c16b138d9fb88c272d2fd232905f90a250505050565b5f8181526002602081815260408084208151608081018352815481526001808301546001600160a01b031694820194909452938101549184019190915260038101549091606084019160ff169081111561054857610548610e32565b600181111561055957610559610e32565b8152505090505f8160400151116105aa5760405162461bcd60e51b8152602060048201526015602482015274141c9bd91d58dd08191bd95cdb89dd08195e1a5cdd605a1b6044820152606401610385565b806040015134146105f25760405162461bcd60e51b8152602060048201526012602482015271125b98dbdc9c9958dd08115512081cd95b9d60721b6044820152606401610385565b600180545f918261060283610f90565b909155505f818152600460208181526040808420349055805160c081018252858152338184019081528183018a815260016060840181815242608086015260a085018990528989526003968790529490972083518155915182880180546001600160a01b0319166001600160a01b0390921691909117905551600282015591519282018054969750909591949293909260ff19909216919084908111156106ab576106ab610e32565b02179055506080820151600482015560a09091015160059091015560408051848152346020820152339183917f7d3c39a6cce20f6949eff0833a4d54fca734dc7c6027773d8885e7faeac98a95910160405180910390a36020808301516040516001600160a01b03909116815282917fa3a9d59445e437d97cac53692b666afef6c152b0642edd206bde8472f387e59a91015b60405180910390a2505050565b5f8181526003602052604090206001600382015460ff16600481111561077357610773610e32565b146107c05760405162461bcd60e51b815260206004820152601b60248201527f4f72646572206e6f7420696e20616363657074656420737461746500000000006044820152606401610385565b60055481600401546107d29190610f77565b42116108205760405162461bcd60e51b815260206004820152601c60248201527f5368697070696e672074696d656f7574206e6f742072656163686564000000006044820152606401610385565b60038101805460ff191660049081179091555f83815260209190915260408082208054908390556001840154915190926001600160a01b03909216916108fc841502918491818181858888f19350505050158015610880573d5f5f3e3d5ffd5b5060018201546040516001600160a01b03909116815283907f16e7a7a8fd7c51d6b4d059d6d7eea946bff398eee64dd1894af645edd23d502b9060200161073e565b60405180608001604052805f548152602001336001600160a01b031681526020018381526020018260018111156108fb576108fb610e32565b90525f80548152600260208181526040928390208451815590840151600180830180546001600160a01b0319166001600160a01b03909316929092179091559284015191810191909155606083015160038201805492939192909160ff1990911690838181111561096e5761096e610e32565b0217905550505f546040513392507f7aa8dd80b1c65573a098046f0d91370ade1df362bdef5311e3df8b8b6aac596d906109ab9086908690610fa8565b60405180910390a35f805490806109c183610f90565b91905055505050565b5f818152600360208181526040808420815160c0810183528154815260018201546001600160a01b031693810193909352600281015491830191909152918201548392839283928392839283928392839291606083019060ff166004811115610a3557610a35610e32565b6004811115610a4657610a46610e32565b81526004820154602080830191909152600590920154604091820152828101515f90815260028084528282208351608081018552815481526001808301546001600160a01b0316968201969096529181015493820193909352600383015494955090939092606084019160ff1690811115610ac357610ac3610e32565b6001811115610ad457610ad4610e32565b81525050905081602001518160200151836040015183604001518460600151866060015187608001518860a00151995099509950995099509950995099505050919395975091939597565b5f818152600360209081526040808320600290810154845290915290206001015481906001600160a01b03163314610b8e5760405162461bcd60e51b81526020600482015260126024820152712737ba10383937b23ab1ba1039b2b63632b960711b6044820152606401610385565b5f8281526003602052604090206001600382015460ff166004811115610bb657610bb6610e32565b14610c115760405162461bcd60e51b815260206004820152602560248201527f4f72646572206e6f74206163636570746564206f7220616c72656164792073686044820152641a5c1c195960da1b6064820152608401610385565b60038101805460ff1916600217905542600582015560405183907ff91b0b39fbb56d78224050bb7e56777ee7aca5ed18ada91cc9c21677db7f9abe905f90a2505050565b5f8181526003602052604090206001015481906001600160a01b03163314610caf5760405162461bcd60e51b815260206004820152600d60248201526c2737ba103a343290313abcb2b960991b6044820152606401610385565b5f8281526003602052604090206002600382015460ff166004811115610cd757610cd7610e32565b14610d1c5760405162461bcd60e51b815260206004820152601560248201527413dc99195c881b9bdd081e595d081cda1a5c1c1959605a1b6044820152606401610385565b6003818101805460ff1916821790555f84815260046020908152604080832080549084905560028087015485528084528285208351608081018552815481526001828101546001600160a01b031696820196909652918101549382019390935294820154909492606084019160ff1690811115610d9b57610d9b610e32565b6001811115610dac57610dac610e32565b90525060208101516040519192506001600160a01b03169083156108fc029084905f818181858888f19350505050158015610de9573d5f5f3e3d5ffd5b5060405185907f676db0e373ff1071d39d7e4b8f731263eacae499c16b138d9fb88c272d2fd232905f90a25050505050565b5f60208284031215610e2b575f5ffd5b5035919050565b634e487b7160e01b5f52602160045260245ffd5b60028110610e5657610e56610e32565b9052565b8481526001600160a01b03841660208201526040810183905260808101610e846060830184610e46565b95945050505050565b5f5f60408385031215610e9e575f5ffd5b82359150602083013560028110610eb3575f5ffd5b809150509250929050565b60058110610e5657610e56610e32565b8681526001600160a01b03861660208201526040810185905260c08101610ef86060830186610ebe565b608082019390935260a00152949350505050565b6001600160a01b0389811682528816602082015260408101879052606081018690526101008101610f406080830187610e46565b610f4d60a0830186610ebe565b60c082019390935260e001529695505050505050565b634e487b7160e01b5f52601160045260245ffd5b80820180821115610f8a57610f8a610f63565b92915050565b5f60018201610fa157610fa1610f63565b5060010190565b82815260408101610fbc6020830184610e46565b939250505056fea2646970667358221220d4781417cf00d0f3754f65915e00f735db81fd8fe95fc31319510723002f9ead64736f6c634300081d0033";

    public static final String FUNC_CONFIRMDELIVERY = "confirmDelivery";

    public static final String FUNC_CONFIRMSHIPMENT = "confirmShipment";

    public static final String FUNC_DELIVERYTIMEOUT = "deliveryTimeout";

    public static final String FUNC_ESCROW = "escrow";

    public static final String FUNC_GETORDER = "getOrder";

    public static final String FUNC_LISTPRODUCT = "listProduct";

    public static final String FUNC_NEXTORDERID = "nextOrderId";

    public static final String FUNC_NEXTPRODUCTID = "nextProductId";

    public static final String FUNC_ORDERS = "orders";

    public static final String FUNC_PRODUCTS = "products";

    public static final String FUNC_PURCHASEPRODUCT = "purchaseProduct";

    public static final String FUNC_REFUNDIFNOTSHIPPED = "refundIfNotShipped";

    public static final String FUNC_RELEASEIFNOTCONFIRMED = "releaseIfNotConfirmed";

    public static final String FUNC_SHIPPINGTIMEOUT = "shippingTimeout";

    public static final Event ORDERACCEPTED_EVENT = new Event("OrderAccepted", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>() {}));
    ;

    public static final Event PRODUCTDELIVERED_EVENT = new Event("ProductDelivered", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}));
    ;

    public static final Event PRODUCTLISTED_EVENT = new Event("ProductListed", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}));
    ;

    public static final Event PRODUCTPURCHASED_EVENT = new Event("ProductPurchased", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event PRODUCTSHIPPED_EVENT = new Event("ProductShipped", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}));
    ;

    public static final Event REFUNDED_EVENT = new Event("Refunded", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Address>() {}));
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
            typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.seller = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static OrderAcceptedEventResponse getOrderAcceptedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(ORDERACCEPTED_EVENT, log);
        OrderAcceptedEventResponse typedResponse = new OrderAcceptedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
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
            typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductDeliveredEventResponse getProductDeliveredEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTDELIVERED_EVENT, log);
        ProductDeliveredEventResponse typedResponse = new ProductDeliveredEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
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
            typedResponse.productId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
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
        typedResponse.productId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
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
            typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.buyer = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.productId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            typedResponse.amount = (BigInteger) eventValues.getNonIndexedValues().get(1).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductPurchasedEventResponse getProductPurchasedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTPURCHASED_EVENT, log);
        ProductPurchasedEventResponse typedResponse = new ProductPurchasedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.buyer = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.productId = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
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
            typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ProductShippedEventResponse getProductShippedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(PRODUCTSHIPPED_EVENT, log);
        ProductShippedEventResponse typedResponse = new ProductShippedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
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
            typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.buyer = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static RefundedEventResponse getRefundedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(REFUNDED_EVENT, log);
        RefundedEventResponse typedResponse = new RefundedEventResponse();
        typedResponse.log = log;
        typedResponse.orderId = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
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

    public RemoteFunctionCall<TransactionReceipt> confirmDelivery(BigInteger orderId) {
        final Function function = new Function(
                FUNC_CONFIRMDELIVERY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> confirmShipment(BigInteger orderId) {
        final Function function = new Function(
                FUNC_CONFIRMSHIPMENT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> deliveryTimeout() {
        final Function function = new Function(FUNC_DELIVERYTIMEOUT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> escrow(BigInteger param0) {
        final Function function = new Function(FUNC_ESCROW, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple8<String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>> getOrder(BigInteger orderId) {
        final Function function = new Function(FUNC_GETORDER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(orderId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}, new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple8<String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>>(function,
                new Callable<Tuple8<String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple8<String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple8<String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>(
                                (String) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue(), 
                                (BigInteger) results.get(5).getValue(), 
                                (BigInteger) results.get(6).getValue(), 
                                (BigInteger) results.get(7).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> listProduct(BigInteger price, BigInteger productType) {
        final Function function = new Function(
                FUNC_LISTPRODUCT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(price), 
                new org.web3j.abi.datatypes.generated.Uint8(productType)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> nextOrderId() {
        final Function function = new Function(FUNC_NEXTORDERID, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> nextProductId() {
        final Function function = new Function(FUNC_NEXTPRODUCTID, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<Tuple6<BigInteger, String, BigInteger, BigInteger, BigInteger, BigInteger>> orders(BigInteger param0) {
        final Function function = new Function(FUNC_ORDERS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint256>() {}));
        return new RemoteFunctionCall<Tuple6<BigInteger, String, BigInteger, BigInteger, BigInteger, BigInteger>>(function,
                new Callable<Tuple6<BigInteger, String, BigInteger, BigInteger, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple6<BigInteger, String, BigInteger, BigInteger, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple6<BigInteger, String, BigInteger, BigInteger, BigInteger, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue(), 
                                (BigInteger) results.get(4).getValue(), 
                                (BigInteger) results.get(5).getValue());
                    }
                });
    }

    public RemoteFunctionCall<Tuple4<BigInteger, String, BigInteger, BigInteger>> products(BigInteger param0) {
        final Function function = new Function(FUNC_PRODUCTS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}, new TypeReference<Address>() {}, new TypeReference<Uint256>() {}, new TypeReference<Uint8>() {}));
        return new RemoteFunctionCall<Tuple4<BigInteger, String, BigInteger, BigInteger>>(function,
                new Callable<Tuple4<BigInteger, String, BigInteger, BigInteger>>() {
                    @Override
                    public Tuple4<BigInteger, String, BigInteger, BigInteger> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple4<BigInteger, String, BigInteger, BigInteger>(
                                (BigInteger) results.get(0).getValue(), 
                                (String) results.get(1).getValue(), 
                                (BigInteger) results.get(2).getValue(), 
                                (BigInteger) results.get(3).getValue());
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> purchaseProduct(BigInteger productId, BigInteger weiValue) {
        final Function function = new Function(
                FUNC_PURCHASEPRODUCT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(productId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function, weiValue);
    }

    public RemoteFunctionCall<TransactionReceipt> refundIfNotShipped(BigInteger orderId) {
        final Function function = new Function(
                FUNC_REFUNDIFNOTSHIPPED, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(orderId)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> releaseIfNotConfirmed(BigInteger orderId) {
        final Function function = new Function(
                FUNC_RELEASEIFNOTCONFIRMED, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(orderId)), 
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
        public BigInteger orderId;

        public String seller;
    }

    public static class ProductDeliveredEventResponse extends BaseEventResponse {
        public BigInteger orderId;
    }

    public static class ProductListedEventResponse extends BaseEventResponse {
        public BigInteger productId;

        public String seller;

        public BigInteger price;

        public BigInteger productType;
    }

    public static class ProductPurchasedEventResponse extends BaseEventResponse {
        public BigInteger orderId;

        public String buyer;

        public BigInteger productId;

        public BigInteger amount;
    }

    public static class ProductShippedEventResponse extends BaseEventResponse {
        public BigInteger orderId;
    }

    public static class RefundedEventResponse extends BaseEventResponse {
        public BigInteger orderId;

        public String buyer;
    }
}
