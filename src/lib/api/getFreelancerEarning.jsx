

import { serverFetch } from "../core/server";

export const getFreelancerEarnings = async (email) => {
  return serverFetch(`/api/freelancer/earnings/${email}`);
};