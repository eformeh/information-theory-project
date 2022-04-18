
package webcamgui;

import com.github.sarxos.webcam.Webcam;
import com.github.sarxos.webcam.WebcamPanel;
import com.github.sarxos.webcam.WebcamResolution;
import javax.swing.JFrame;


public class webcamPanel {
    public static void main(String[] args) {
        Webcam webcam= Webcam.getDefault();
         webcam.setViewSize(WebcamResolution.VGA.getSize());
         
         WebcamPanel webcamPanel=new WebcamPanel(webcam);
         webcamPanel.setMirrored(true);
         webcamPanel.setImageSizeDisplayed(true);
         webcamPanel.setFPSDisplayed(true);
        webcamPanel.setFPSLimited(false);
       
         JFrame frame = new JFrame();
         frame.add(webcamPanel);
         frame.setLocationRelativeTo(null);
         
         frame.pack();
         frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
         frame.setVisible(true);
         
    }
    
}
