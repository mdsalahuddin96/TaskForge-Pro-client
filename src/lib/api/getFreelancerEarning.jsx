

import { protectedFetch, serverFetch } from "../core/server";

export const getFreelancerEarnings = async (email) => {
  return protectedFetch(`/api/freelancer/earnings/${email}`);
};