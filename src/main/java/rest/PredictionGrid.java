package rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;

import com.google.gson.Gson;

@ApplicationPath("api")
@Path("/predictionGrid")
public class PredictionGrid extends Application {
	
	
  /**
   * Get prediction of grid use.
   * REST API example:
   * <code>
   * GET http://localhost:9080/WatGov/api/predictionGrid
   * </code>
   * 
   * Response:
   * @return A collection of all the Visitors
   */
    @GET
    @Path("/")
    @Produces({"application/json"})
    public String getVisitors() {
		
		
		List<String> names = new ArrayList<String>();
		
		names.add("grid");
		names.add("battery");
		
		return new Gson().toJson(names);
    }

}



