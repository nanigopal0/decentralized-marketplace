package com.decentralized.marketplace.contract.service;

import com.decentralized.marketplace.contract.java.SmartMarketPlace;
import com.decentralized.marketplace.entity.ProductType;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.utils.Convert;

import java.math.BigInteger;

@Slf4j
@Service
public class ContractService {

    private SmartMarketPlace smartMarketPlace;
    @Value("${web3.rpc.url}")
    private String rpcUrl;

    @Value("${web3.private.key}")
    private String privateKey;

    @Value("${web3.contract.address}")
    private String contractAddress;

    @PostConstruct
    public void init() {
        Web3j web3j = Web3j.build(new HttpService(rpcUrl));
        Credentials credentials = Credentials.create(privateKey);
//        BigInteger gasLimit = BigInteger.valueOf(5_000_000);         // safe for Ganache
//        BigInteger gasPrice = BigInteger.valueOf(20_000_000_000L);   // 20 Gwei
        this.smartMarketPlace = SmartMarketPlace.load(
                contractAddress,
                web3j,
                credentials,
                new StaticGasProvider(
                        Convert.toWei("20", Convert.Unit.GWEI).toBigInteger(),
                        BigInteger.valueOf(5_000_000)
                )
        );
        log.info("credential.getAddress() = {}", credentials.getAddress());
        log.info("demo.getContractAddress() = {}", smartMarketPlace.getContractAddress());
    }


    public void addProductToBlockchain(String productId, int price, ProductType productType) {
        try {
            smartMarketPlace.listProduct(productId, BigInteger.valueOf(price), productType == ProductType.DIGITAL ? BigInteger.ONE : BigInteger.ZERO).send();
        } catch (Exception e) {
            log.error("Error while listing product: {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    public Tuple4<String, String, BigInteger, BigInteger> getProduct(String productId) {
        try {
            Tuple4<String, String, BigInteger, BigInteger> result = smartMarketPlace.products(productId).send();
            log.info("send result = {}, {}, {}, {}", result.component1(),result.component2(),result.component3(),result.component4());
            return result;
        } catch (Exception e) {
            log.error("Error while getting product: {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    public void purchaseProduct(String productId, String orderId, BigInteger weiValue) {
        try {
            smartMarketPlace.purchaseProduct(productId,orderId,weiValue).send();
        } catch (Exception e) {
            log.error("Error while purchasing product: {}", e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

}
