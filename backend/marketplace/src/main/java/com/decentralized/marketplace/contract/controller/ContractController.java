package com.decentralized.marketplace.contract.controller;

import com.decentralized.marketplace.contract.service.ContractService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.tuples.generated.Tuple4;
import org.web3j.tuples.generated.Tuple8;

import java.math.BigInteger;

@Slf4j
@RestController
@RequestMapping("contract")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("get-product")
    public ResponseEntity<Tuple4<String, String, BigInteger, BigInteger>> getProduct(@RequestParam(value = "productId") String productId) {
        return ResponseEntity.ok(contractService.getProduct(productId));
    }

    @GetMapping("get-order")
    public ResponseEntity<Tuple8<String, String, String, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger>> getOrder(@RequestParam(value = "orderId") String orderId) {
        return ResponseEntity.ok(contractService.getOrderByOrderId(orderId));
    }


}
