import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { opentelemetry } from '@elysiajs/opentelemetry'

import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'

const ListResponse = t.Array(t.Object({
      platform: t.String(),
      value: t.String()
}))

export type ListResponseType = typeof ListResponse.static



export const app = new Elysia()
      .use(cors())
      .use(swagger())
      .use(
            opentelemetry({
                  spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())]
            })
      )

      .get('/hello', () => "Ahoy!!!")

      .get('list/:skibidi', ({ request, status, params: { skibidi } }) => {

            if (Number(skibidi) > 50) {
                  return status("Not Found", "I'm away")
            }

            var jsonHeaders = request.headers.toJSON();

            console.log("JsonHeaders ", jsonHeaders);
            console.log("Input number is ", skibidi);

            const resp = [{
                  platform: "ANDROID",
                  value: "message 1" + skibidi

            }, {
                  platform: "IOS",
                  value: "message 2" + skibidi

            }];

            return resp;

      }
            // , {
            //       params: t.Object({
            //             skibidi: t.Number()
            //       }),
            //       response: t.Array(t.Object({
            //             platform: t.String(),
            //             value: t.String()
            //       })),
            // })
      )


      .listen(3000);

console.log(
      `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type ApiType = typeof app;
