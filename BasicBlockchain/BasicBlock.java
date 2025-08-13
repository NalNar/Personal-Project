/* Creating a class block that will make up blockchain 
 * 1) Basic Blockchain would have individual block signature of previous data, which is hash.
 * it would also contain it's own hash and hash of previous block
 * Calculating and comparing the hashes allow us to see if a blockchain is invalid
 */

 import java.util.Date;

 public class BasicBlock{

    public String hash;
    public String previousHash;
    private String data;
    private long timeStamp; 
    private int nonce ;

    // BasicBlock Constructor
    public BasicBlock(String data, String previousHash){
        this.data = data;
        this.previousHash = previousHash;
        this.timeStamp = new Date().getTime();
        // making sure we do this after we set the other values.
        this.hash = calculateHash(); 

    }

    public String calculateHash(){
        String calculatedHash = StringUtil.applySha256(
                    previousHash 
                    + Long.toString(timeStamp) 
                    + data);
                    
        return calculatedHash;
    }
    public void mineBlock (int difficulty){
        //Create a string with difficulty * "0"
        String target = new String(new char[difficulty]).replace('\0','0');
        while(!hash.substring(0,difficulty).equals(target)){
            nonce++;
            hash = calculateHash();
        }
        System.out.println("Block Mined :" + hash);
    }
}