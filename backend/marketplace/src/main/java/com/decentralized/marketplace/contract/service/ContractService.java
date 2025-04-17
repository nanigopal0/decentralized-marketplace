package com.decentralized.marketplace.contract.service;

import com.decentralized.marketplace.contract.DemoDTO;
import com.decentralized.marketplace.contract.java.Demo;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple2;
import org.web3j.tx.gas.StaticGasProvider;
import org.web3j.utils.Convert;

import java.math.BigInteger;

@Slf4j
@Service
public class ContractService {

    private Demo demo;
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
            this.demo = Demo.load(
                contractAddress,
                    web3j,
                    credentials,
                    new StaticGasProvider(
                            Convert.toWei("20", Convert.Unit.GWEI).toBigInteger(),
                            BigInteger.valueOf(5_000_000)
                    )
            );
            log.info("credential.getAddress() = {}", credentials.getAddress());
            log.info("demo.getContractAddress() = {}", demo.getContractAddress());
    }

    public Tuple2<String, BigInteger> getUserFromBlockchain(String userAddr) throws Exception {
        Tuple2<String, BigInteger> send = demo.getUser(userAddr).send();
        log.info("User from blockchain: {}, {}", send.component1(), send.component2());
        return send;
    }


    public void setUserFromBlockchain(DemoDTO dto) throws Exception {
        TransactionReceipt send = demo.setUser(dto.getName(), BigInteger.valueOf(dto.getAge())).send();// replace with your function
        log.info("User set from blockchain: {}", send.toString());
    }
}
