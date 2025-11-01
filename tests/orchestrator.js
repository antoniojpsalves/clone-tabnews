import retry from "async-retry";

async function waitForAllServices() {
  await awaitForWebService();

  async function awaitForWebService() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw new Error("Service is not up yet");
      }
    }
  }
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
