package com.decentralized.marketplace.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MailDTO {
    private String to;
    private String subject;
    private String body;
    private String from;
}
