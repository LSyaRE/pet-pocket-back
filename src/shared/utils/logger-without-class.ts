import { Injectable, Logger } from "@nestjs/common";
import { NestApplication } from "@nestjs/core";

export class LoggerWithoutClass {
    static readonly instance = new Logger(NestApplication.name, {
        timestamp: true,
      });
}