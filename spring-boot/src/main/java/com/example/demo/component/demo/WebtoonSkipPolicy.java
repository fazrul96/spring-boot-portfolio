package com.example.demo.component.demo;

import org.springframework.batch.core.step.skip.SkipPolicy;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClientException;

@Component
public class WebtoonSkipPolicy implements SkipPolicy {
    public static final int MAX_SKIP_COUNT = 2;

    @Override
    public boolean shouldSkip(Throwable t, long skipCount) {
        return skipCount < MAX_SKIP_COUNT
            && (t instanceof WebClientException
            || t.getCause() instanceof WebClientException);
    }
}