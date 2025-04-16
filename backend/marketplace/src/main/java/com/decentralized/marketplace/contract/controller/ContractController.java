package com.decentralized.marketplace.contract.controller;

import com.decentralized.marketplace.contract.DemoDTO;
import com.decentralized.marketplace.contract.java.Demo;
import com.decentralized.marketplace.contract.service.ContractService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web3j.tuples.generated.Tuple2;

import java.math.BigInteger;

@Slf4j
@RestController
@RequestMapping("contract")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @PostMapping("set")
    public ResponseEntity<String> setUser(@RequestBody DemoDTO demoDTO) {
        try {
            contractService.setUserFromBlockchain(demoDTO);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("get")
    public ResponseEntity<Tuple2<String, BigInteger>> getUser(@RequestParam(value = "userAddr") String userAddr) {
        try {
            return ResponseEntity.ok(contractService.getUserFromBlockchain(userAddr));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
