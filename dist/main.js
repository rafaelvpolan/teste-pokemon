"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pokemon Teams API')
        .setDescription('API para gerenciar treinadores, times e pokémons')
        .setVersion('1.0')
        .addTag('trainers', 'Endpoints de treinadores')
        .addTag('teams', 'Endpoints de times')
        .addTag('pokemon', 'Endpoints de pokémons')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3005;
    await app.listen(port);
    console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
    console.log(`📚 Documentação Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map