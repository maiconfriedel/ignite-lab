import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4qw8h9t086k01yxbcqndokw/master",
  cache: new InMemoryCache(),
});
